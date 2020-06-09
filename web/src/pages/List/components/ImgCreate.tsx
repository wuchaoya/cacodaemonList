import React, {useState} from 'react';
import {Upload, Button, Modal,  Transfer,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  handleOk: (targetSelectedKeys: [string],sourceSelectedKeys: [string]) => void;
  handleOrc: (formData: void) => void;
}


const ImgCreate: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  
  const [fileList, setFileList] = useState()
  
  const [code, setCode] = useState(0)
  
  const [gameNames, setGameNames] = useState([])
  
  const [targetNames, setTargetNames] = useState([])
  
  const [selectedKeys, setSelectedKeys] = useState([])
  
  const [targetSelectedKeys, setTargetSelectedKeys] = useState([])
  
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState([])
  
  const clear = () => {
    setFileList([])
    setCode(0)
    setGameNames([])
    setTargetNames([])
    setSelectedKeys([])
    setTargetSelectedKeys([])
    setSourceSelectedKeys([])
    onCancel()
  }
  
  const handleChange = (info: any) => {
    console.log(info.fileList[0].response);
    setFileList([...info.fileList])
    if (info.fileList[0].response && info.fileList[0].response.code === 200) {
      setGameNames(info.fileList[0].response.data)
      setCode(info.fileList[0].response.code)
    }
  }
  
  const handleTransfer = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    setTargetNames(nextTargetKeys)
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };
  
  // eslint-disable-next-line no-shadow
  const handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    // @ts-ignore
    setSelectedKeys( [...sourceSelectedKeys, ...targetSelectedKeys])
    setTargetSelectedKeys(targetSelectedKeys)
    setSourceSelectedKeys(sourceSelectedKeys)
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };
  
  
  const data = {
    action: '/api/orc',
    onChange: handleChange,
    multiple: true,
  };
  
  return (
    <Modal
      afterClose={clear}
      destroyOnClose
      title="图片识别"
      visible={modalVisible}
      onCancel={() => clear()}
      onOk={() => props.handleOk(targetSelectedKeys,sourceSelectedKeys)}
    >
      {code === 200 ?
	      <Transfer
          rowKey={record => record.words}
		      dataSource={gameNames}
		      titles={['Source', 'Target']}
		      targetKeys={targetNames}
		      selectedKeys={selectedKeys}
		      onChange={handleTransfer}
		      onSelectChange={handleSelectChange}
		      render={item => item.words}/>:
        
        <Upload {...data} fileList={fileList}>
          <Button>
            <UploadOutlined /> 上传图片
          </Button>
        </Upload>
      }
    </Modal>
  );
};

export default ImgCreate;
