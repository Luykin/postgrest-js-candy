import axios from 'axios';

export const op = {};
const reverseOp = {};
const opRandom = `__${+new Date()}__`;
const opList = ['and', 'or', 'eq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'in', 'is', 'neq', 'cs', 'cd', 'ov', 'sl', 'sr', 'nxr', 'nxl', 'adj', 'not'];
opList.map((e) => {
    op[e] = `${opRandom}${e}`;
    reverseOp[`${opRandom}${e}`] = e;
});

//新增
export async function pgAdd(path, data) {
    try {
        return await _netRq(`${path}`, 'post', {
            'data': data
        }, {
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        });
    } catch (e) {
        console.log(e);
    }
}

//删除
export async function pgDelete(path, where) {
    try {
        const data = {};
        const andItem = _transformWhere(where);
        andItem && Object.assign(data, {'and': `(${andItem})`});
        return await _netRq(`${path}`, 'delete', {
            'params': data
        }, {
            'Prefer': 'return=representation'
        });
    } catch (e) {
        console.log(e);
    }
}

//修改
export async function pgModify(path, where, data) {
    const body = {};
    const andItem = _transformWhere(where);
    andItem && Object.assign(body, {'and': `(${andItem})`});
    return await _netRq(`${path}`, 'patch', {
        'params': body,
        'data': data
    }, {
        'Prefer': 'return=representation'
    });
}

//查询
export async function pgQuery(path, where, amount, select) {
    try {
        const data = {};
        const andItem = _transformWhere(where);
        andItem && Object.assign(data, {'and': `(${andItem})`});
        const slcItem = _transformSelect(select);
        slcItem && Object.assign(data, {'select': slcItem});
        const orderItem = _transformOrder(amount);
        orderItem && Object.assign(data, {'order': orderItem});
        return await _netRq(`${path}`, 'get', {
            'params': data
        }, {
            ..._transformAmount(amount)
        });
    } catch (e) {
        console.log(e);
    }
}

function _transformOrder(amount) {
    try {
        if ('order' in amount) {
            const obj = amount['order'];
            let str = '';
            for (let i in obj) {
                str += `${i}.${obj[i]},`
            }
            return str;
        } else {
            return ''
        }
    } catch (e) {
        return ''
    }
}

function _transformAmount(amount) {
    try {
        if (amount && amount['page'] > 0 && amount['size'] > 0) {
            const page = amount['page'];
            const size = amount['size'];
            return {
                'Range-Unit': 'items',
                'Range': `${(page - 1) * size}-${page * size - 1}`,
                'Prefer': `count=${amount['Prefer'] || 'exact'}` //exact, planned, estimated
            }
        } else {
            return {'Accept': 'application/vnd.pgrst.object+json'}
        }
    } catch (e) {
        return {};
    }
}

function _transformSelect(select) {
    try {
        if (typeof select === 'string' && select.split(',').length) {
            return select;
        } else {
            return ''
        }
    } catch (e) {
        return ''
    }
}

function _transformWhere(where) {
    try {
        const listWhere = Object.entries(where);
        if (!listWhere.length) {
            return ''
        }
        const item = listWhere[0][0];
        const value = listWhere[0][1];
        if (item in reverseOp) {
            if (reverseOp[item] === 'and' || reverseOp[item] === 'or') {
                return `${reverseOp[item]}(${_transformWhere(value)})`
            }
        }
        const isValue = typeof value === 'string' || typeof value === 'number';
        const ary = isValue ? [`${opRandom}eq`, value] : Object.entries(value)[0];
        const copyWhere = {...where};
        delete copyWhere[item];
        const continua = Object.entries(copyWhere).length > 0;
        return `${item}.${isValue ? 'eq' : reverseOp[ary[0]]}.${isValue ? value : ary[1]}${continua ? ',' + _transformWhere(copyWhere) : ''}`;
    } catch (e) {
        return '';
    }
}

//基础网络请求
function _netRq(url, method, data, headers) {
    return new Promise((resolve, reject) => {
        const fob = {url, method, headers};
        data['params'] && (fob.params = data['params']);
        data['data'] && (fob.data = (data['data']));
        axios(fob).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}
