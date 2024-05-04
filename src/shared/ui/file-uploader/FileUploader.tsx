import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Upload, UploadProps, UploadFile } from "antd";

import styles from "./FileUploader.module.scss";
import { t } from "../translation/translation";
import Span from "../span";
import { FileUpload as FileUploadIcon } from "../icons/file-upload";
import Box from "../box";
import { Close } from "../icons/close";
import Spinner from "../spinner";

interface OwnProps extends UploadProps {
  label?: string;
  typesInfo?: string;
  sizeInfo?: string;
  types?: string[];
  maxSize?: number;
  showError?: boolean;
  maxFilesCount?: number;
  maxFileNameLength?: number;
  onError?: (isSetError: boolean) => void;
}

type Props = OwnProps;

const displayFileNameLength = 20;

export const FileUploader = ({
  label,
  typesInfo,
  sizeInfo,
  onChange,
  types,
  maxSize,
  maxFilesCount = 3,
  maxFileNameLength = 200,
  showError,
  onError,
  ...props
}: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [filteredFileList, setFilteredFileList] = useState<UploadFile[]>();
  const [attachedFilesCount, setAttachedFilesCount] = useState(0);
  const [notValidSizeFiles, setNotValidSizeFiles] = useState<Record<string, { fileName: string }>>({});
  const [notValidTypeFiles, setNotValidTypeFiles] = useState<Record<string, { fileName: string }>>({});
  const [notValidFileNameFiles, setNotValidFileNameFiles] = useState<Record<string, { fileName: string }>>({});

  const checkFile = (file: UploadFile) => {
    let isSetTypeError = false;
    let isSetSizeError = false;
    let isSetFileNameError = false;
    const fileType = file.type?.split("/")[1] || "";
    const fileUid = file.uid;
    const fileName = file.name;
    const fileSize = file.size || 0;
    if (Array.isArray(types) && types.length && !types.includes(fileType)) {
      setNotValidTypeFiles((oldNotValidTypeFiles) => ({ ...oldNotValidTypeFiles, [fileUid]: { fileName } }));
      isSetTypeError = true;
    } else if (fileName.length > maxFileNameLength) {
      setNotValidFileNameFiles((oldNotValidFileNameFiles) => ({
        ...oldNotValidFileNameFiles,
        [fileUid]: { fileName },
      }));
      isSetFileNameError = true;
    } else {
      if (notValidTypeFiles?.[fileUid]) {
        setNotValidTypeFiles((oldNotValidTypeFiles) => {
          delete oldNotValidTypeFiles![fileUid];
          return { ...oldNotValidTypeFiles };
        });
      }
      if (notValidFileNameFiles?.[fileUid]) {
        setNotValidFileNameFiles((oldNotValidFileNameFiles) => {
          delete oldNotValidFileNameFiles![fileUid];
          return { ...oldNotValidFileNameFiles };
        });
      }
    }
    if (maxSize && fileSize > maxSize) {
      setNotValidSizeFiles((oldNotValidSizeFiles) => ({ ...oldNotValidSizeFiles, [fileUid]: { fileName } }));
      isSetSizeError = true;
    } else if (notValidSizeFiles?.[fileUid]) {
      delete notValidSizeFiles![fileUid];
      setNotValidSizeFiles((oldNotValidSizeFiles) => {
        delete oldNotValidSizeFiles![fileUid];
        return { ...oldNotValidSizeFiles };
      });
    }
    return !isSetSizeError && !isSetTypeError && !isSetFileNameError;
  };

  const handleChange: UploadProps["onChange"] = (options) => {
    const filteredFileList = options.fileList.filter(checkFile);
    setFileList(options.fileList.slice(0, maxFilesCount));
    setAttachedFilesCount(filteredFileList.length);
    setFilteredFileList(filteredFileList.slice(0, maxFilesCount));
  };

  const handleRemoveFileButtonClick = (uid: string) => {
    const clearedFileList = fileList?.filter((item) => item.uid !== uid);
    if (!clearedFileList?.length) {
      setNotValidSizeFiles({});
      setNotValidTypeFiles({});
      setNotValidFileNameFiles({});
    } else {
      const rmKeys: string[] = [];
      Object.keys(notValidTypeFiles).forEach((uid) => {
        !clearedFileList.some((item) => item.uid === uid) && rmKeys.push(uid);
      });
      Object.keys(notValidSizeFiles).forEach((uid) => {
        !clearedFileList.some((item) => item.uid === uid) && rmKeys.push(uid);
      });
      Object.keys(notValidFileNameFiles).forEach((uid) => {
        !clearedFileList.some((item) => item.uid === uid) && rmKeys.push(uid);
      });
      rmKeys.forEach((uid) => {
        delete notValidTypeFiles[uid];
        delete notValidSizeFiles[uid];
        delete notValidFileNameFiles[uid];
      });
      setNotValidSizeFiles({ ...notValidSizeFiles });
      setNotValidTypeFiles({ ...notValidTypeFiles });
      setNotValidFileNameFiles({ ...notValidFileNameFiles });
    }
    const filteredFileList = clearedFileList?.filter(checkFile);
    setFileList(clearedFileList);
    setAttachedFilesCount(filteredFileList?.length || 0);
    setFilteredFileList(filteredFileList);
  };

  const uploadProps: UploadProps = {
    beforeUpload: () => false,
    showUploadList: false,
    onChange: handleChange,
    fileList,
    ...props,
  };

  const notValidTypeFilesCount = Object.keys(notValidTypeFiles).length;
  const notValidSizeFilesCount = Object.keys(notValidSizeFiles).length;
  const notValidFileNameFilesCount = Object.keys(notValidFileNameFiles).length;
  const isSetTypeError = Boolean(fileList?.length) && Boolean(notValidTypeFilesCount);
  const isSetSizeError = Boolean(fileList?.length) && Boolean(notValidSizeFilesCount);
  const isSetFileNameError = Boolean(fileList?.length) && Boolean(notValidFileNameFilesCount);
  const isSetMaxCountFilesError =
    attachedFilesCount + notValidTypeFilesCount + notValidSizeFilesCount + notValidFileNameFilesCount >= maxFilesCount;

  useEffect(() => {
    if (!isSetSizeError && !isSetTypeError && !isSetFileNameError) {
      onChange?.({ fileList: filteredFileList } as any);
      onError?.(false);
    } else if (filteredFileList?.length && filteredFileList?.length > maxFilesCount) {
      onChange?.({ fileList: undefined } as any);
      onError?.(true);
    } else {
      onChange?.({ fileList: undefined } as any);
      onError?.(true);
    }
  }, [filteredFileList, isSetSizeError, isSetTypeError, isSetFileNameError]);

  return (
    <div>
      {Boolean(label) && <Box mb={10}>{label}</Box>}
      {fileList?.map(({ uid, name, status }) => (
        <div
          key={uid}
          className={clsx(styles.fileWrapper, {
            [styles.fileWrapper__error]: Boolean(
              notValidSizeFiles?.[uid] || notValidTypeFiles?.[uid] || notValidFileNameFiles?.[uid]
            ),
          })}
        >
          <div className={clsx(styles.fileNameWrapper)}>
            {status === "uploading" && (
              <div className={clsx(styles.spinner)}>
                <Spinner />
              </div>
            )}
            {!notValidSizeFiles?.[uid] && !notValidTypeFiles?.[uid] && !notValidFileNameFiles?.[uid] && (
              <div>
                <FileUploadIcon className={clsx(styles.uploadIcon)} />
              </div>
            )}
            <div>{name.length > displayFileNameLength ? `${name.slice(0, displayFileNameLength)}...` : name}</div>
          </div>
          <div className={clsx(styles.fileNameWrapper)} onClick={() => handleRemoveFileButtonClick(uid)}>
            <Close className={clsx(styles.removeFileButton)} />
          </div>
        </div>
      ))}
      {isSetTypeError && (
        <div className={clsx(styles.fieldError)}>{t("Формат для документов: pdf, jpg, jpeg, png")}</div>
      )}
      {isSetSizeError && <div className={clsx(styles.fieldError)}>{t("Макс 2 МБ")}</div>}
      {isSetFileNameError && <div className={clsx(styles.fieldError)}>{t("Maкс 200 символов")}</div>}
      <Box>
        <Upload multiple disabled={isSetMaxCountFilesError} {...uploadProps}>
          <div className={clsx(styles.button)}>
            <Span weight={"bold"}>{t("Загрузить файл")}</Span>
          </div>
        </Upload>
      </Box>
      {isSetMaxCountFilesError && (
        <Box>
          <Span color="danger">{`${t("Макс 3 файла")}`}</Span>
        </Box>
      )}
      {showError && (
        <Box>
          <Span color="danger">{`${t("Обязательное поле")}`}</Span>
        </Box>
      )}
      {Boolean(typesInfo) && <div className={clsx(styles.info)}>{typesInfo}</div>}
      {Boolean(sizeInfo) && <div className={clsx(styles.info)}>{sizeInfo}</div>}
    </div>
  );
};
