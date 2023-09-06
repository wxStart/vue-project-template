/* eslint-env node */

module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新特性
        'fix',  // 修复bug
        'docs', // 文档修改
        'style', // 代码格式修改
        'refactor', // 代码重构
        'perf', // 优化相关
        'test', // 测试用例修改
        'build', // 修改编辑相关
        'ci',
        'chore', // 其他修改，比如改变构建流程   增加依赖库 工具等
        'revert', // 回滚
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
