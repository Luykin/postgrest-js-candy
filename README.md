### **⛅ postgrest-js-candy 是 postgREST 的 前端请求工具**



- PostgREST官网  https://postgrest.org

##### **⛵️安装**

```
 yarn add postgrest-js-candy
```

##### **⛵️导入**

```
import {op, pgQuery, pgAdd, pgDelete, pgModify} from "postgrest-js-candy"
```

##### ⛵️新增`pgAdd(path, data)`

- path: 请求路径

- data: 新增数据

```
const ret = await pgAdd('http://localhost:3000/orders', {book_id: 1,customer_id: 1});
```

##### **⛵️查询`pgQuery(path, where, amount, select)`**

path: 请求路径
amount: 分页相关,单挑数据查询不传,多条数据查询

```
{ page: 1, size: 20, order: {'age': 'desc', 'id': 'asc'}, Prefer: 'exact' }
```

select: 返回值筛选

```
'name, age, tabel(*)'
```




where: 查询条件

```
{
    [op.and]: {
                a: {[op.eq]: 2},
                b: {[op.eq]: 3},
                [op.or]: {
                    c: {[op.in]: '{1,2,3}'},
                    d: {[op.like]: '查询条件'}
                }
    }
}
```

```
const ret = await pgQuery('http://localhost:3000/books', { name: 'xxx',}, {page: 1, size: 20}, 'name,id,orders(*)');
```

##### **⛵️修改`pgModify(path, where, data)`**

```
const ret = await pgModify('http://localhost:3000/books', { id: {[op.in]: '(1,2)'}}, {name: 'xxx'})
```



##### **⛵️删除`pgDelete(path, where)`**

```
const ret = await pgDelete('http://localhost:3000/books', { name: {[op.eq]: 'pgAdd1'}});
```
