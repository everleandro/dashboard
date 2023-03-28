
export default function () {
    const _required = (val: any) => {
        return !!val || val === 0 || 'Este campo es requerido';
    }

    const _email = (value: string) => {
        return /^[^@]+@[^@.]+(.[^@]+)*\.[a-zA-Z]{2,}$/.test(value) || "El email debe ser válido";
    }

    return { _required, _email }
}
