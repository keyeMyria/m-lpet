import axios from 'axios'
import qs from 'qs'
import cookie from 'js-cookie'
import {Toast} from 'antd-mobile'

export default async (type = 'GET',url = '',params = {},form = false) => {
    const token = cookie.get('token');
    const serverHost = 'http://119.29.146.141:8882';
    url = `${serverHost}${url}`;
    return new Promise( (resolve,reject) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const options = {
            url,
            method:type,
            data:params,
            headers:form ? {'Content-Type': 'multipart/form-data'} : {'Content-Type':'application/json'},
            /*withCredentials: true,*/
        }

        axios.request(options).then( (res) => {
                resolve(res.data)
            }).catch( (err) => {
                if(err.message == 'Network Error'){
                    Toast.fail('网络连接失败', 1.2)
                }
                reject(err)
            })

    })
}
