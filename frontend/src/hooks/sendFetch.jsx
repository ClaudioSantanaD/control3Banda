//Como los envios (post y send) se usan en funciones onSubmit, deberia cambiarse a formato asincronico, sin usar useEffect

import { useEffect, useState } from "react";

export const useSendFetch = (url, typeReq, body, head) => {

    const [jsonRes, setJsonRes] = useState([])
    const [error, setError] = useState('')

    console.log(JSON.stringify(body))

    useEffect( () => {
        fetch(url,{
            method: typeReq,
            headers: head,
            body: JSON.stringify(body),
            mode: 'cors'
        })
        .then(res => res.json())
        .then(jsonRes => setJsonRes(jsonRes))
        .catch(e => setError(toString(e)))
    }, [url, typeReq, body, head])

    return {jsonRes, error}
}