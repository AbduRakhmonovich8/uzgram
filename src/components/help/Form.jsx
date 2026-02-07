import React, { useState } from "react";

export default function Form() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        subject: "general",
        message: "",
        agree: false,
    });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    const styles = {
        wrap: {
            maxWidth: 640,
            margin: "32px auto",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
            background: "linear-gradient(180deg,#fff,#fbfdff)",
            fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif",
        },
        header: {
            marginBottom: 14,
        },
        title: {
            fontSize: 20,
            margin: 0,
            color: "#0f172a",
        },
        desc: {
            margin: "6px 0 18px",
            color: "#475569",
            fontSize: 13,
        },
        form: {
            display: "grid",
            gap: 12,
        },
        row: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
        },
        field: {
            display: "flex",
            flexDirection: "column",
            gap: 6,
        },
        label: {
            fontSize: 13,
            color: "#334155",
        },
        input: {
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #e6eef8",
            outline: "none",
            fontSize: 14,
            background: "#fbfdff",
        },
        textarea: {
            minHeight: 110,
            resize: "vertical",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #e6eef8",
            fontSize: 14,
            background: "#fbfdff",
        },
        select: {
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #e6eef8",
            background: "#fbfdff",
            fontSize: 14,
        },
        help: {
            fontSize: 12,
            color: "#94a3b8",
        },
        rowBottom: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 6,
        },
        checkboxWrap: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "#334155",
        },
        button: {
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: "#0ea5a4",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(14,165,164,0.12)",
        },
        error: {
            color: "#ef4444",
            fontSize: 12,
        },
        success: {
            marginTop: 10,
            padding: 10,
            borderRadius: 8,
            background: "#ecfeff",
            color: "#065f46",
            fontSize: 13,
        },
        '@media': { // not used by inline style; keep layout responsive using simple stack
        },
    };

    function validate() {
        const e = {};
        if (!values.name.trim()) e.name = "Ism kiritilishi shart.";
        if (!values.email.trim()) e.email = "Email kiritilishi shart.";
        else {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(values.email)) e.email = "To'g'ri email kiriting.";
        }
        if (!values.message.trim()) e.message = "Izoh bo'sh bo'lmasin.";
        if (!values.agree) e.agree = "Shartlarni qabul qiling.";
        return e;
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setValues((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validation = validate();
        setErrors(validation);
        setSent(false);
        if (Object.keys(validation).length === 0) {
            // Simulate submit
            setTimeout(() => {
                setSent(true);
                setValues({
                    name: "",
                    email: "",
                    subject: "general",
                    message: "",
                    agree: false,
                });
            }, 450);
        }
    }

    return (
        <div style={styles.wrap}>
            <div style={styles.header}>
                <h3 style={styles.title}>Bog'lanish formasi</h3>
                <div style={styles.desc}>Savolingiz bo'lsa yuboring — tez orada javob beramiz.</div>
            </div>

            <form style={styles.form} onSubmit={handleSubmit} noValidate>
                <div style={styles.row}>
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="name">Ism</label>
                        <input
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Ismingiz"
                        />
                        {errors.name && <div style={styles.error}>{errors.name}</div>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="you@example.com"
                            type="email"
                        />
                        {errors.email && <div style={styles.error}>{errors.email}</div>}
                    </div>
                </div>

                <div style={styles.field}>
                    <label style={styles.label} htmlFor="subject">Mavzu</label>
                    <select
                        id="subject"
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        style={styles.select}
                    >
                        <option value="general">Umumiy</option>
                        <option value="support">Yordam</option>
                        <option value="feedback">Fikr-mulohaza</option>
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label} htmlFor="message">Xabar</label>
                    <textarea
                        id="message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        style={styles.textarea}
                        placeholder="Xabaringizni yozing..."
                    />
                    {errors.message && <div style={styles.error}>{errors.message}</div>}
                </div>

                <div style={styles.rowBottom}>
                    <label style={styles.checkboxWrap}>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={values.agree}
                            onChange={handleChange}
                        />
                        <span style={{ fontSize: 13 }}>Shartlarni qabul qilaman</span>
                    </label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button type="submit" style={styles.button}>
                            Yuborish
                        </button>
                    </div>
                </div>
                {errors.agree && <div style={styles.error}>{errors.agree}</div>}

                {sent && <div style={styles.success}>Xabaringiz muvaffaqiyatli yuborildi. Rahmat!</div>}
                <div style={styles.help}>Biz hech qachon ma'lumotlaringizni uchinchilarga bermaymiz.</div>
            </form>
        </div>
    );
}