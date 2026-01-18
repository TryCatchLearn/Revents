import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from 'react';
import { cloudinaryConfig, getCloudinaryUploadUrl } from '../../../lib/cloudinary/cloudinary';

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

type Props = {
    uploadPhoto: (url: string, uploadId: string) => void;
    path: string;
}

export default function PhotoUpload({uploadPhoto, path}: Props) {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <div className="App">
            <FilePond
                files={files}
                onupdatefiles={(fileItems) => setFiles(fileItems.map(fileItem => fileItem.file as File))}
                allowMultiple={false}
                maxFiles={1}
                server={{
                    process: (_fieldName, file, _metadata, load, error, progress, _abort) => {
                        const timestamp = Date.now();
                        const uploadId = `${timestamp}-${file.name}`;

                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
                        formData.append('folder', path);
                        formData.append('public_id', uploadId);

                        const xhr = new XMLHttpRequest();
                        xhr.open('POST', getCloudinaryUploadUrl(), true);

                        xhr.upload.onprogress = (e) => {
                            if (e.lengthComputable) {
                                progress(true, e.loaded, e.total);
                            }
                        };

                        xhr.onload = () => {
                            if (xhr.status === 200) {
                                const response = JSON.parse(xhr.responseText);
                                uploadPhoto(response.secure_url, response.public_id);
                                load(response.secure_url);
                            } else {
                                error('Upload failed');
                            }
                        };

                        xhr.onerror = () => {
                            error('Upload failed');
                        };

                        xhr.send(formData);
                    }
                }}
                name="files"
                instantUpload={false}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                credits={false}
            />
        </div>
    );
}