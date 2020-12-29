⛅欢迎使用 postgrest-js-candy
<br>postgREST官网: https://postgrest.org
<br>[postgrest-js-candy]git: https://github.com/White-paper/postgrest-js-candy
<br>[postgrest-js-candy]npm: https://www.npmjs.com/package/postgrest-js-candy
<br>目前支持4种简易请求: 查询,新增,修改,删除
<br><h2>安装使用</h2>
<br>`yarn add postgrest-js-candy`
<br>`import {op, pgQuery, pgAdd, pgDelete, pgModify} from "postgrest-js-candy"`
<br><h2>新增pgAdd(path, data)</h2>
<br>path: 请求路径
<br>data: 新增数据
<br>示例:`const ret = await pgAdd('http://localhost:3000/orders', {book_id: 1,customer_id: 1});`

<br><h2>查询pgQuery(path, where, amount, select)</h2>
<br>path: 请求路径
<br>amount: 分页相关,单挑数据查询不传,多条数据查询示例: <br>`{
page: 1,
size: 20,
order: {'age': 'desc', 'id': 'asc'},
Prefer: 'exact'//exact, planned, estimated
}`
<br>select: 返回值筛选, 示例: <br>`'name, age, tabel(*)'`
<br>where: 查询条件,示例: <br>`{
                            [op.and]: {
                                a: {[op.eq]: 2},
                                b: {[op.eq]: 3},
                                [op.or]: {
                                    c: {[op.in]: '{1,2,3}'},
                                    d: {[op.like]: '查询条件'}
                                }
                            }
                        }`
<br>示例:`const ret = await pgQuery('http://localhost:3000/books', { name: 'xxx',}, {page: 1, size: 20}, 'name,id,orders(*)');`

<br><h2>修改pgModify(path, where, data)</h2>
<br>示例:`const ret = await pgModify('http://localhost:3000/books', { id: {[op.in]: '(1,2)'}}, {name: 'xxx'})`

<br><h2>删除pgDelete(path, where)</h2>
<br>示例:`const ret = await pgDelete('http://localhost:3000/books', { name: {[op.eq]: 'pgAdd1'}});`

<br><h2>正在完善...</h2>
