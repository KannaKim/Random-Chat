import React from 'react'
import {v4 as uuidv4} from 'uuid'
export function get_or_create_userID(key) {
    const local_id = localStorage.getItem(key)
    if(local_id==null)
    {
        const user_id = uuidv4()
        localStorage.setItem(key, user_id)
        return user_id
    }
    else
    {
        return local_id
    }
}
