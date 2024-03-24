/* eslint-disable no-unused-vars */


const Title = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-[400px] text-center my-8 ">
            <p className="text-center text-yellow-600 mb-2">----{subHeading}----</p>
            <h2 className="text-3xl text-slate-700  font-serif text-center border-slate-300 border-y-4 py-4 uppercase">{heading}</h2>
        </div>
    );
};

export default Title;