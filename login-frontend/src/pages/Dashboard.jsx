import {Suspense, lazy} from 'react';
import {useSelector} from 'react-redux';

import UserHeader from '../components/header_footer/UserHeader';
import Footer from '../components/header_footer/Footer';
import LeftMenu from '../components/dashboard/leftMenu';

import { ProgressSpinner } from 'primereact/progressspinner';
import { Panel } from 'primereact/panel';

const ListUser = lazy(() => import('../components/dashboard/primaryFeature/listUser'));
const InfoUser = lazy(() => import('../components/dashboard/primaryFeature/infoUser'));
const EditUser = lazy(() => import('../components/dashboard/primaryFeature/editUser'));
const DashBoard = lazy(() => import('../components/dashboard/scheduleComponent/dashboardAdmin'));
const UserSchedule = lazy(() => import('../components/dashboard/scheduleComponent/userSchedule'));
function AdminDashboard() {
  const currentView = useSelector(state => state.view.currentView);
  const role = useSelector(state => (state.user?.isLoggin ? state.user?.userData.role : "admin"));
  const renderTableData = () => {
    switch (currentView){
      case 'ListStudent': return <ListUser type="student" />;
      case 'ListTeacher': return <ListUser type="teacher" />; 
      case 'ListAdmin': return <ListUser type="admin" />;
      case 'DashBoard': return <DashBoard />;

      case 'InfoUser': return <InfoUser />;
      case 'EditUser': return <EditUser />;
      case 'Schedule': return <UserSchedule />;
      default: return <div>Invalid</div>; 
    }
  };
  return (
    <>
      <UserHeader />
      <div className="grid">
        <div className="col-2 leftBody min-h-screen"> 
          <LeftMenu role={role} />
        </div>
        <div className="col-10 rightBody">
          <div className='dataTable'>
            <Suspense fallback={
              <Panel header={<ProgressSpinner />} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              </Panel>
            }>
              {renderTableData()}
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;

