import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Boy from './Boy'
import Girl from './Girl'
import Home from './Home'
import Layout from './Layout'
import AdditionalInfo from './AdditionalInfo';
import AdditionalInfoGirls from './AdditionalInfoGirls';
import AddViewReferences from './AddViewReferences';
import AddViewReferencesGirl from './AddViewReferencesGirl';
import BBusy from './BBusy';
import GBusy from './GBusy';
import UploadDownloadPicture from './UploadDownloadPicture';
import GirlUploadDownloadPicture from './GirlUploadDownloadPicture';
import Ideas from './Ideas';
import GirlIdeas from './GirlIdeas';
import PrivateRoute from './PrivateRoute'
import { AuthContextComponent } from './AuthContextComponent';
import Signup from './Signup'
import Login from './Login';
import Logout from './Logout'
import Forgot from './Forgot'
import ChangePassword from './ChangePassword'

class App extends React.Component {

    render() {
        return (
            <AuthContextComponent>
               
            <Layout>
                    <Routes>
                        <Route exact path='/forgot' element={<Forgot />} />
                    <Route exact path='/' element={<Home />} />
                        <Route exact path='/login' element={<Login />} />
                       
                        <Route exact path='/changePassword/:token' element={<ChangePassword />} />
                        <Route exact path='/signup' element={<Signup />} />
                   

                    <Route exact path='/boy' element={
                        <PrivateRoute>
                            <Boy />
                        </PrivateRoute>
                    } />

                    <Route exact path='/girl' element={
                        <PrivateRoute>
                            <Girl />
                        </PrivateRoute>
                    } />

                    <Route exact path='/addtionalInfo/:id' element={
                        <PrivateRoute>
                            <AdditionalInfo />
                        </PrivateRoute>
                    } />

                    <Route exact path='/addtionalInfoGirls/:id' element={
                        <PrivateRoute>
                            <AdditionalInfoGirls />
                        </PrivateRoute>
                    } />

                    <Route exact path='/addViewReferences/:id' element={
                        <PrivateRoute>
                            <AddViewReferences />
                        </PrivateRoute>
                    } />

                    <Route exact path='/addViewReferencesGirl/:id' element={
                        <PrivateRoute>
                            <AddViewReferencesGirl />
                        </PrivateRoute>
                    } />

                    <Route exact path='/uploadDownloadPicture/:id' element={
                        <PrivateRoute>
                            <UploadDownloadPicture />
                        </PrivateRoute>
                    } />

                    <Route exact path='/girlUploadDownloadPicture/:id' element={
                        <PrivateRoute>
                            <GirlUploadDownloadPicture />
                        </PrivateRoute>
                    } />

                    <Route exact path='/boyBusy/:id' element={
                        <PrivateRoute>
                            <BBusy />
                        </PrivateRoute>
                    } />

                    <Route exact path='/girlBusy/:id' element={
                        <PrivateRoute>
                            <GBusy />
                        </PrivateRoute>
                    } />

                    <Route exact path='/ideas/:id' element={
                        <PrivateRoute>
                            <Ideas />
                        </PrivateRoute>
                    } />

                    <Route exact path='/girlideas/:id' element={
                        <PrivateRoute>
                            <GirlIdeas />
                        </PrivateRoute>
                    } />
                        <Route exact path='/logout' element={
                            <PrivateRoute>
                                <Logout />
                            </PrivateRoute>
                        } />
                </Routes>


                </Layout>
            </AuthContextComponent>
        );
    }
};

export default App;