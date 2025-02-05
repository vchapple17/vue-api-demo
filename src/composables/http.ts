import type {AxiosRequestConfig, AxiosResponse} from "axios";
import axios from 'axios'

export function useHttp() {

    const get = (url: string, params: object = {}, config: AxiosRequestConfig = {}): Promise<any> => {
        return new Promise((resolve, reject) => {
            config = {
                params,
                ...config,
            }

            axios.get(url, config).then((response: AxiosResponse) => {
                resolve(response.data)
            }).catch(e => {
                console.error(e)
                reject(e)
            })
        })
    }

    return {
        get
    }
}