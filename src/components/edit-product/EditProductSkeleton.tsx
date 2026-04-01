import Card from "../ui/Card";

export default function EditProductSkeleton () {
    return (
        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 relative items-start">
            <Card className="flex flex-col w-full lg:w-[350px] h-[350px] max-h-[350px] lg:sticky lg:top-5 p-4 space-y-4">
                <div className="bg-loading w-50 h-5 animate-pulse"></div>
                <div className="w-full flex flex-col gap-5 items-center">
                    <div className="bg-loading w-50 h-50 animate-pulse"></div>
                    <div className="bg-loading w-50 h-8 animate-pulse"></div>
                </div>
            </Card>
            <Card className="w-full lg:w-auto lg:flex-1 flex flex-col space-y-5">
                <div className="bg-loading w-50 h-5 animate-pulse"></div>
                <div className="bg-loading w-full h-10 animate-pulse"></div>


                <div className="bg-loading w-full h-50 animate-pulse"></div>

                <div className="w-full h-[2px] bg-loading animate-pulse"></div>

                <div className="bg-loading w-80 h-5 animate-pulse"></div>
                <div className="bg-loading w-40 h-40 animate-pulse"></div>

                <div className="bg-loading w-full h-10 animate-pulse"></div>
                <div className="bg-loading w-full h-10 animate-pulse"></div>
                <div className="bg-loading w-full h-10 animate-pulse"></div>
                <div className="bg-loading w-full h-10 animate-pulse"></div>

                <div className="bg-loading w-50 h-10 animate-pulse"></div>

                <div className="w-full h-[2px] bg-loading animate-pulse"></div>

                <div className="bg-loading w-full h-10 animate-pulse"></div>

                <div className="bg-loading w-full h-12 mt-5 animate-pulse"></div>
                
            </Card>
        </div>
    )
}