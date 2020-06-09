import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
// @ts-ignore
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ImgCreate from './components/ImgCreate';

import { TableListItem } from './data.d';
import { query, update, add, remove,forgive,orc, filterAdd , findNameMany } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await add({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在更新');
  try {
    await update({...fields});
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await remove({
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      ids: selectedRows.map((row) => row._id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleForgive = async(selectedRows: (((prevState: {}) => {}) | {})[]) => {
  const hide = message.loading('正在更新');
  if (!selectedRows) return true;
  try {
    // @ts-ignore
    await forgive({
      // eslint-disable-next-line no-underscore-dangle
      ids: selectedRows.map((row) => row._id),
      status: 1
    });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请重试');
    return false;
  }
};

const handleOrc = async (file: any) => {
  console.log(file);
  try {
    await orc(file);
  } catch (error) {
    return false;
  }
  return false
};

const getNameMany = async (names: [string]) => {
  return await findNameMany({names})
}


const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [createImgModalVisible, handleImgModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState([])
  
  const [dataType, setDataType] = useState(0);
  
  const request =  async (params: any) => {
    if (dataType === 0) {
      return  await query({ ...params })
    } else {
     const respone = await getNameMany(sourceSelectedKeys)
      setSourceSelectedKeys([])
      setDataType(0)
      return respone;
    }
  }
  
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '遇见次数',
      dataIndex: 'metNumber',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} 次`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '尚未原谅', status: 'Default' },
        1: { text: '已原谅', status: 'Processing' },
      },
    },
    {
      title: '最近遇见时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item: any, {defaultRender, ...rest}: any, form: { getFieldValue: (arg0: string) => void; }) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: React.SetStateAction<{}>) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a onClick={() => {
            handleForgive([record])
            actionRef.current.reload();
          }}>原谅</a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="黑名单列表"
        actionRef={actionRef}
        rowKey="_id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => handleImgModalVisible(true)}>
            <PlusOutlined /> 图片识别
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                    if (e.key === 'forgive') {
                      await handleForgive(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="forgive">批量原谅</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              遇见次数总计 {selectedRows.reduce((pre, item) => pre + item.metNumber, 0)} 次
            </span>
          </div>
        )}
        request={request}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      <ImgCreate
        handleOrc={handleOrc}
        handleOk={async (targetSelectedKeys: [string],sourceSelectedKeys: [string]) => {
         
         await filterAdd({ names: targetSelectedKeys.map(name => ({name})) })
          handleImgModalVisible(false)
          setSourceSelectedKeys(sourceSelectedKeys)
          setDataType(1)
          actionRef.current.reload();
  
        }}
        onCancel={() => handleImgModalVisible(false)}
        modalVisible={createImgModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          data={stepFormValues}
          onOk={() =>{
            handleUpdate(stepFormValues)
            handleUpdateModalVisible(false);
            setStepFormValues({});
            actionRef.current.reload();
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          update={setStepFormValues}
          updateModalVisible={updateModalVisible}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
