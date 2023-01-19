import { useQuery } from '@apollo/client';
import { Button, Divider, Dropdown, MenuProps, Typography, theme } from 'antd';
import { HiOutlineChevronLeft, HiOutlineUser } from 'react-icons/hi2';
import { FETCH_COMPANY_SELECT } from '../../service/graphql/Company';
import { ResponseCompany_Branch } from '../../__generated__/graphql';

const { useToken } = theme;

type CompanyCardProps = {
  data: any;
};

const CompanyCard: React.FC<CompanyCardProps> = ({ data }) => {
  const token = useToken();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-full h-5">
        <span className="truncate w-52">{data?.name}</span>
        <div
          style={{ borderRadius: token.token.borderRadius }}
          className="flex text-xs justify-center items-center bg-gray-200 px-2"
        >
          <HiOutlineUser />
          <span>{data?._count?.users} คน</span>
        </div>
      </div>
      <div className="text-xs text-gray-600 truncate w-52">{data?.address}</div>
    </div>
  );
};
const CompanySelect: React.FC = () => {
  const token = useToken();
  const { data, loading, refetch } = useQuery(FETCH_COMPANY_SELECT, {
    notifyOnNetworkStatusChange: true,
  });
  const menuitem: MenuProps['items'] = [
    {
      key: '1',
      label: 'interset',
    },
  ];
  return (
    <div className="px-1 py-2">
      <Dropdown
        destroyPopupOnHide
        trigger={['click']}
        placement="bottomLeft"
        dropdownRender={(menu) => {
          return (
            <div
              className="dropdown-content"
              style={{
                borderRadius: token.token.borderRadius,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                }}
              >
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  เลือกสาขา
                </Typography.Text>
                <Typography.Text className="text-gray-600 text-xs border-gra">
                  {data?.company?.name}
                </Typography.Text>
              </div>
              <Divider style={{ margin: 0 }} />
              {menu}
            </div>
          );
        }}
        menu={{
          items: data?.company?.branch?.map((e) => {
            return {
              key: e?.id,
              label: <CompanyCard data={e} />,
              className: 'border-gray-100 border-[1.5px]',
            };
          }) as MenuProps['items'],
        }}
      >
        <Button
          style={{ width: '100%', padding: 0, paddingLeft: '8px' }}
          type="text"
          onClick={() => refetch()}
          loading={loading}
          className="flex items-center"
        >
          <HiOutlineChevronLeft size={18} />
          <span className="pl-[0.6rem]">เลือกสาขา</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default CompanySelect;
