import { useEffect, useState } from "react";

export default function CounterWS({setModal}) {
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('wss://aracelis-svelte-mitigatedly.ngrok-free.dev');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setNumbers(prev => [...prev, data.number]);
        };

        ws.onclose = () => console.log("WebSocket closed");

        return () => ws.close();
    }, []);
    useEffect(()=>{
        numbers.map(e => {
            setModal({ type: "note", message: e })
        })
    },[numbers])
}