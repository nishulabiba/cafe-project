

const MenuItem = ({item}) => {
    
    const {name, image, recipe, price} = item;
    return (
        <div className="flex space-x-2 gap-2  items-start justify-between">
            <div className="flex gap-2">
            <img style={{borderRadius: '0 200px 200px 300px'}} className=" w-[100px]" src={image} alt="" />
            <div className="">
                <h3 className="uppercase font-bold">{name}---------------------</h3>
                <p className="">{recipe}</p>
            </div>
            </div>
            <p className=" text-yellow-500 me-2">${price}</p>
        </div>
    );
};

export default MenuItem;