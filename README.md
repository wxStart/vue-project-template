## git 相关配置

### git 提交的时候格式化代码

1. 安装 husky 和 lint-staged
   `pnpm install -D husky lint-staged`
2. 生成 `.husky 目录` 和 `pre-commit.sh`
   `npx husky-init`
3. 生成 `format-code.sh`
   `npx husky add .husky/format-code.sh `
4. 修改 `package.json`

```
"scripts": {
    "prepare": "husky install",
    "format-code": "bash .husky/format-code.sh"
  },
"lint-staged": {
    "**/*.{js,jsx,ts,tsx,vue,json}": [
      "prettier --write src/"
    ]
  },

```

5. 修改 `pre-commit`

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run format-code

```

6. 修改 `format-code.sh`

```
#!/bin/bash

red=$(tput setaf 1)
green=$(tput setaf 2)
reset=$(tput sgr0)

echo "》》》${green}开始按统一配置格式化暂存区代码...${reset}"

if ! npx lint-staged; then
    echo "《《《${red}格式化出错，请根据错误内容修改后再次尝试！${reset}"
    exit 1;
fi

echo "《《《${green}恭喜你，格式完成！${reset}"
exit

```

### git 检验代码中是否有冲突

1.  增加`check-conflict.sh`

```
#!/bin/sh

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo "》》》${green}开始检查暂存区代码是否存在未解决冲突的代码...${reset}"

for FILE in $(git diff --name-only --cached --)
do
    # 过滤掉 check-conflict.sh 文件
    if [ "$FILE" = ".husky/check-conflict.sh" ]; then
        continue
    fi
    # 匹配 <<<把这里的内容去掉包括中括号<<<< HEAD
    if grep "<<<【请把这里的内容去掉包括中括号】<<<< HEAD" "$FILE";
    then
        echo "《《《${red}$FILE 存在 未解决冲突的代码，请解决以上所在行的冲突后再提交！${reset}"
        exit 1
    fi
done

echo "《《《${green}恭喜你，检测通过！${reset}"
exit

```

2. 修改`pre-commit`，追加上
  
```
pnpm run check-conflict # 冲突检测
```

### git 提交规范约束 约束提交commit的格式

1. 安装依赖 @commitlint/config-conventional 和 @commitlint/cli
   `pnpm install  -D @commitlint/config-conventional @commitlint/cli`
2. 添加配置文件`commitlint.config.cjs`

```
module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'other'
      ]
    ]
  },
  'type-case': [0],
  'type-empty': [0],
  'scope-empty': [0],
  'scope-case': [0],
  'subject-full-stop': [0, 'never'],
  'subject-case': [0, 'never'],
  'header-max-length': [0, 'always', 72]
}

```

3. 增加 `commit-msg`
   `npx husky add .husky/commit-msg `
4. 修改 `commit-msg.sh`

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

red=$(tput setaf 1)
green=$(tput setaf 2)
reset=$(tput sgr0)

printf "\n《《《%s开始检测commit描述是否符合规范...%s\n" "${green}" "${reset}"

if ! npx --no -- commitlint --edit $1 ; then
    echo "《《《${red}commit描述检测到异常，请按规范填写commit描述！${reset}"
    exit 1;
fi
printf "《《《%s恭喜你，非常规范！%s\n" "${green}" "${reset}"
exit

```

5. 修改 `package.json`

```
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },

```
