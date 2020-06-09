import React from 'react';
import {Input, InputNumber, Row, Col, Modal } from 'antd';

interface CreateFormProps {
  updateModalVisible: boolean;
  onCancel: () => void;
  onOk: () => void;
  update: (e: any) => void;
  data: any
}


const UpdateForm: React.FC<CreateFormProps> = (props) => {
  const { updateModalVisible, onCancel, data, update,onOk } = props;
  
  const onChangeMetNumber = (v: any) => {
    update({...data,metNumber: v})
  }
  
  const onChangeDesc = (e: any) => {
    update({...data,desc:  e.target.value})
  }
  
  return (
    <Modal
      destroyOnClose
      title='修改'
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      onOk={() => onOk()}
    >
     <Row gutter={[24,24]}>
       <Col>名称:</Col>
       <Col><Input disabled value={data.name} /></Col>
     </Row>
      <Row gutter={[24,24]}>
        <Col>描述:</Col>
        <Col>
          <InputNumber onChange={onChangeMetNumber} value={data.metNumber}  />
        </Col>
      </Row>
      <Row gutter={[24,24]}>
        <Col>描述:</Col>
        <Col>
          <Input.TextArea
            onChange={onChangeDesc}
            value={data.desc}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Col>
      </Row>
    
    </Modal>
  );
};

export default UpdateForm;
