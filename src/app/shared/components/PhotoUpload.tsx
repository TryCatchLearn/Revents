import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from 'react';
import { storage } from '../../../lib/firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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
                    process: (_fieldName, file, _metadata, load, error, progress) => {
                        const timestamp = Date.now();
                        const uploadId = `${timestamp}-${file.name}`;
                        const storageRef = ref(storage, `${path}/${uploadId}`);
                        const task = uploadBytesResumable(storageRef, file);

                        task.on(
                            'state_changed',
                            snap => {
                                progress(true, snap.bytesTransferred, snap.totalBytes);
                            },
                            err => {
                                error(err.message)
                            },
                            () => {
                                getDownloadURL(task.snapshot.ref).then(async (url) => {
                                    uploadPhoto(url, uploadId);
                                    load(url);
                                })
                            }
                        )
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