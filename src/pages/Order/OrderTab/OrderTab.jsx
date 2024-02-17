import CardComponent from "../../Shared/CardComonent/CardComponent";


const OrderTab = ({items}) => {
    return (
        <div className="grid md:grid-cols-3  my-30 justify-items-center">
            {
                items?.map(item=> <CardComponent key={item._id} item={item}/>)
            }
        </div>
    );
};

export default OrderTab;