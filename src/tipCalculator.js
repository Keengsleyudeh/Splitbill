import { useState } from "react"


export default function App() {
    return <>
    <TipCalculator />
    </>
}

function TipCalculator() {
    const [bill, setBill] = useState('');
    const [myService, setMyService] = useState(0)
    const [hisService, setHisService] = useState(0)
    return (
        <div>
            <BillInput bill={bill} onBill={setBill}/>
            <SelectPercentage 
            myService={myService} onMyService={setMyService} 
            hisService={hisService} onHisService={setHisService}
            />
            <Output 
            bill={bill}
            myService={myService}
            hisService={hisService}
            />
            <Reset 
            onHisService={setHisService}
            onMyService={setMyService}
            onBill={setBill}
            />
        </div>
    )
}
function BillInput({bill,onBill}) { 


    return (
    <div>
        How Much was the Bill?
        <input type='text' value={bill} placeholder='input bill' onChange={(e)=>onBill(Number(e.target.value))}/>
    </div>
    )
}
    
function SelectPercentage({myService,hisService,onMyService,onHisService}) {

    return (
        
        <div>
            How did you like the service?
            <select value={myService} onChange={(e)=>onMyService(Number(e.target.value))}>
                <option value={0}>it was bad</option>
                <option value={5}>it was okay</option>
                <option value={10}>it was very good</option>
            </select>
            <div>
            How did your friend like the service?
            <select value={hisService} onChange={(e)=>onHisService(Number(e.target.value))}>
                <option value={0}>it was bad</option>
                <option value={5}>it was okay</option>
                <option value={10}>it was very good</option>
            </select>
            </div>
        </div>
    )
}

function Output({bill,myService,hisService}) {
    const total= Number(bill)+myService+hisService;
    return (
        <p>
            {`You pay $${bill===''? 0: total}`}
        </p>
    )
}

function Reset({bill,onBill,onMyService,onHisService}) {
    function handleResetPrice() {
        onHisService(0)
        onBill(bill=>bill='')
        onMyService(0)
    }
    return (
        <div>
            <button onClick={handleResetPrice}>Reset</button>
        </div>
    )
}
