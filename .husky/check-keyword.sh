#!/bin/bash

red=$(tput setaf 1)
green=$(tput setaf 2)
reset=$(tput sgr0)

echo "》》》${green}开始检查暂存区代码是否有 'TODO:' 或者 'debugger'...${reset}"

for FILE in $(git diff --name-only --cached -- 'src/')
do
    # 这是一个正则表达式，用来匹配 TODO: 和 debugger
    if grep 'TODO:\|debugger' "$FILE";
    then 
        echo "《《《${red}$FILE 包含 'TODO:' 或者 'debugger'，请删除后再提交！${reset}"
        exit 1
    fi
done

echo "《《《${green}恭喜你，检测通过！${reset}"
exit