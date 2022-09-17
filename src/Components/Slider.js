import Card from "./Card";

export default function Slider({data}) {
    return (
        <div className="Slider">
            {
                data.map(item => {
                    if (item != undefined) {
                        return (
                            <Card data={item}/>
                        )
                    }
                })
            }
        </div>
    )
}