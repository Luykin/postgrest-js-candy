⛅欢迎使用 postgrest-js-candy
<br>postgREST官网: https://postgrest.org
<br>目前支持4种简易请求生成: 查询,新增,修改,删除
<br><h2>查询pgQuery(path, where, amount, select)</h2>
<br>path: 请求路径,示例: http://abc.com/test
<br>amount: 分页相关,单挑数据查询不传,多条数据查询示例: `{
page: 1,
size: 20,
order: {'age': 'desc', 'id': 'asc'}
}`
<br>select: 返回值筛选, 示例: `'name, age, tabel(*)'`
<br>where: 查询条件,示例: `{
                            [op.and]: {
                                a: {[op.eq]: 2},
                                b: {[op.eq]: 3},
                                [op.or]: {
                                    c: {[op.in]: '{1,2,3}'},
                                    d: {[op.like]: '查询条件'}
                                }
                            }
                        }`
