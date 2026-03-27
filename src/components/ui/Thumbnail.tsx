import { Upload, Image } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

interface ThumbnailProps {
    thumbnailSrc: string;
    remove: () => void;
    error?: string;
    handleFileChange: (e : React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

export default function Thumbnail ({ thumbnailSrc, remove, handleFileChange, error } : ThumbnailProps) {
    return (
        <Card className="flex flex-col w-full lg:w-[350px] h-[350px] max-h-[350px] lg:sticky lg:top-5 p-4 space-y-4">
            <h1 className="text-lg font-semibold">Thumbnail</h1>

            {/* Thumbnail Image */}
            <div className="w-full flex items-center justify-center overflow-hidden rounded">
                {thumbnailSrc ? 
                    <img
                        src={thumbnailSrc}
                        alt="Thumbnail"
                        className="object-contain w-full h-full"
                    /> : 
                    <Image className="w-full h-full" strokeWidth={0.7}/>
                }
            </div>

            {/* Actions */}
            <div className="flex justify-center">
            {thumbnailSrc ? (
                <Button
                    label="Remove"
                    className="bg-red-600 text-white"
                    onClick={remove}
                />
            ): (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        id="thumbnail"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <label htmlFor="thumbnail" className="cursor-pointer">
                        <span className="border border-[var(--border-panel)] text-sm inline-flex items-center gap-2 px-4 py-2 rounded">
                            <Upload size={16} />
                            Upload Thumbnail
                        </span>
                    </label>
                </>
            )}
            </div>
            <span className="text-xs text-red-500">{error}</span>
        </Card>
    )
}