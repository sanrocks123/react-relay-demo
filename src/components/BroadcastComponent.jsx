
import { useEffect, useState } from "react";
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { userNameBroadcastChannelName, userNameValidationChannelName } from '../utils/BroadcastChannel'

export default function BroadcastComponent() {
    console.log('broadcast component loaded');
    return (
        <div>
            <UserNameSearch />
            <UserNameValidation />
        </div>
    );
}

function UserNameSearch() {
    const userNameBroadcastChannel = new BroadcastChannel(userNameBroadcastChannelName);
    const userNameValidationChannel = new BroadcastChannel(userNameValidationChannelName);
    const [form, setForm] = useState({ name: 'init-message' });
    const [result, setResult] = useState({ isAvailable: false });

    const onSubmit = (values) => {
        console.log('onSubmitButtonClickEvent')
        setForm(values);
        // todo - save form data
    }


    userNameValidationChannel.onmessage = event => {
        console.log('userNameValidationChannel onMessage: ' + JSON.stringify(event.data))
        setResult({ isAvailable: event.data.isAvailable });
    }

    useEffect(() => {
        console.log('UserNameSearch: useEffect ' + JSON.stringify(form));
        userNameBroadcastChannel.postMessage(form);
    }, [form]);

    return (
        <div>
            <p>UserNameSearch</p>
            <Formik initialValues={form} onSubmit={onSubmit}>
                <Form>
                    <Field id="name" name="name" placeholder="type here" />
                    <button type="submit">Check</button>
                </Form>
            </Formik>
            <p>Duplicate Status : {result.isAvailable ? "YES" : "NO"}</p>
        </div>
    );
}

function UserNameValidation() {

    const userNameBroadcastChannel = new BroadcastChannel(userNameBroadcastChannelName);
    const userNameValidationChannel = new BroadcastChannel(userNameValidationChannelName);

    const [userNames, setUserNames] = useState(['initial-userNameState']);
    const [data, setData] = useState({ value: 'intial-data' });

    useEffect(() => {

        userNameBroadcastChannel.onmessage = event => {
            console.log('userNameBroadcastChannel onMessage: ' + JSON.stringify(event.data))
            setData({ value: event.data.name });
        }

        console.log('data : ' + data.value);
        setUserNames(userNames => [...userNames, data.value]);

        const isFound = userNames.includes(data.value);
        userNameValidationChannel.postMessage({ isAvailable: isFound, message: data.value });

    }, [data]);

    return (
        <div id="UserNameValidation">
            <br />
            <p>UserNameValidation</p>
            {
                userNames.map((v, k) => (
                    <div key={k}> {JSON.stringify(v)}</div>
                ))
            }
        </div>
    );
}
