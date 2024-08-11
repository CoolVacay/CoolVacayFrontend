"use client"
import React from 'react'
import ImageUploading, { type ImageListType } from "react-images-uploading";

function UploadButton() {
    const [images, setImages] = React.useState([]);

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };

    const onConfirm = ( onImageRemoveAll: () => void) => {
        console.log("SEND REQUEST TO BACKEND WITH THIS: ", images);
        //TODO: Make REQUEST
        //TODO: EMPTY IMAGES
        onImageRemoveAll(); //TODO: Keep this here only if the call was successful
    };

  return (
    <ImageUploading
        value={images}
        onChange={onChange}
    >
        {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageRemove,
        isDragging,
        dragProps
        }) => (
        // write your building UI
        <div className="upload__image-wrapper">
            <button
            className="mt-4 rounded-full  border border-[#29ABE2] px-5 py-3 text-primary"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
            >
            Change Photo
            </button>
            &nbsp;
            {imageList.map((image, index) => (
            <div key={index} className="my-2">
                <img src={image.dataURL} alt="" width="100" />
                <div className="flex gap-2 mt-2">
                <button className='border rounded-full border-[#29ABE2] px-5 py-3 text-primary' onClick={() => onConfirm(onImageRemoveAll)}>Confirm</button>
                <button className='border rounded-full border-[#29ABE2] px-5 py-3 text-primary' onClick={() => onImageRemove(index)}>Remove</button>
                </div>
            </div>
            ))}
        </div>
        )}
    </ImageUploading>
  )
}

export default UploadButton