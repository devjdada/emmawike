const ImageUploadComponent = (props: any) => {
    const { src } = props.node.attrs;

    return (
        <div className="image-upload-node">
            <img src={src} alt="" />
        </div>
    );
};

export default ImageUploadComponent;
