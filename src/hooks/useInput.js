import React, { useEffect, useState } from "react";

export function useInput(initialForm, deps = []) {
    const [form, setForm] =useState(initialForm);
    const onChange = (e) => {
    const {name, value} = e.target;
    setForm({
        ...form,
        [name]:value
    })
    }
    const reset = () => {
        setForm({...initialForm})
    }

    useEffect(()=>{
        console.log(1);
    }, deps)

    return [form, onChange, reset]
}