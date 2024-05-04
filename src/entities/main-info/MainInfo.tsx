export const MainInfo = () => {
    const { total, public2, complete } = { total: 0, public2: 0, complete: 0 }

    return (
        <div>
            <div>
                <p>{total}</p>
                <p>Total</p>
            </div>
            <div>
                <p>{public2}</p>
                <p>Total</p>
            </div>
            <div>
                <p>{complete}</p>
                <p>Total</p>
            </div>
        </div>
    )
}