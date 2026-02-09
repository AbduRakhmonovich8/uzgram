import { useEffect, useState } from "react";

export default function CounterWS() {
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

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Realtime Count</h2>
            <ul className="list-disc pl-5 space-y-1">
                <p>
                    {numbers.map((n) => (
                        n + "+"
                    ))}</p>
            </ul>
        </div>
    );
}