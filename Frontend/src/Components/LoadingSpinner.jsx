import RingLoader from "react-spinners/RingLoader";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <RingLoader color="#3b82f6" size={50} />
        </div>
    );
};
export default LoadingSpinner;