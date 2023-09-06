// eslint-disable-next-line no-undef
console.log('process.env.npm_execpath: ', process.env.npm_execpath)

// eslint-disable-next-line no-undef
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.log('\x1b[31m%s\x1b[0m', 'Error!!!请使用pnpm进行包管理处理')
  // eslint-disable-next-line no-undef
  process.exit(1)
}
