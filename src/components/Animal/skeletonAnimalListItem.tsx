const SkeletonAnimalListItem = () => {
  return (
    <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5 mt-6">
      <div className="flex flex-col space-y-3 w-full px-10">
        <div className="w-40 bg-gray-300 h-4 rounded-md "></div>
        <div className="w-60 bg-gray-300 h-6 rounded-md "></div>
        <div className="w-full bg-gray-300 h-4 rounded-md "></div>
      </div>
    </div>
  );
};

export default SkeletonAnimalListItem;
