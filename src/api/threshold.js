import request from '@/utils/request'
import axios from "axios";
/*  上传加密门限文件
    组织外人员根据组织和文件名搜索门限文件
    组织内人员根据组织和文件名搜索门限文件
    申请解密文件
    组织人员同意解密文件
    组织人员申请生成公钥
    组织人员同意生成公钥
     */
export const thresholdApi ={
    /* 
    上传加密门限文件
    参数：fileName , org
    返回：Promise
    */
   encryptThreshold:  function({file, org}){
        const data = new FormData();
        data.append("file", file);
        data.append("orgName", org);
        return new Promise((resolve, reject) => {
            request({
                url: '/content/thresholdUpload',
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                data,
                timeout: 0,
            }).then(response => {
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },
    // 组织内人员搜索文件
    orgSearchThreshold: function({orgName,fileName,fromUid}){
        const data = {
            orgName: orgName,
            fileName: fileName,
            fromUid:fromUid,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/content/threshold/orgList',
                method: 'get',
                headers: { 'Content-Type': 'multipart/form-data' },
                params:data,
                timeout: 0,
            }).then(response => {
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },
    /* 
    组织外人员根据组织名和文件名搜索门限文件
    参数：org , fileName
    org为空则查询所有组织
    返回：Promise
    */
   searchThreshold: function({orgName , fileName }) {
       const _data = {orgName , fileName  };
       const data ={
            orgName : _data.orgName,
            fileName : _data.fileName,
       }
        return new Promise((resolve, reject) => {
            request({
                url: '/content/threshold/list',
                method: 'get',
                headers: { 'Content-Type': 'multipart/form-data' },
                params:data,
                timeout: 0,
            }).then(response => {
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },
    
    /* 
    组织人员同意解密文件
    参数：userName , org ,fileName ,fromUid
    返回： Promise
    */
    approvalThreshold: function({userName, org, fileName,fromUid}) {
        const data = {
            orgName:org,
            fileName:fileName,
            uid:userName,
            fromUid:fromUid,
        }
        return new Promise((resolve, reject) => {
            request({
                url: '/org/apply/ThresholdFile/approval',
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                params:data,
                timeout: 0,
            }).then(response => {
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
        
    },
    applyThresholdOrgPartSk: function({orgName, uid}) {
        const data = {
            orgName: orgName,
            userName: uid,
        }
        return new Promise((resolve,reject) => {
            request({
                url: '/org/threshold/apply-part-sk',
                method: 'post',
            
                params:data,
                timeout: 0,
            }).then(response => {
                if(response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },
    approveThresholdOrgPartSk: function({orgName, uid}){
        const data = {
            orgName: orgName,
            userName: uid,
        }
        return new Promise((resolve,reject) => {
            request({
                url: '/org/threshold/approve-part-sk',
                method: 'post',
   
                params:data,
                timeout: 0,
            }).then(response => {
                if(response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },
    completeThresholdOrgPartSk: function({orgName, uid}){
        const data = {
            orgName: orgName,
            userName: uid,
        }
        return new Promise((resolve,reject) => {
            request({
                url: '/org/Threshold/complete-pk',
                method: 'post',
   
                params:data,
                timeout: 0,
            }).then(response => {
                if(response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },
    tryApplyThresholdFile: function({orgName,user,fileName}){
        const data = {
            orgName : orgName,
            fileName : fileName,
            userName : user,
            
        }
        return new Promise((resolve,reject) => {
            request({
                url: '/org/apply/threshold',
                method: 'post',
                data,
            }).then(response => {
                if(response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },

    decrypt: function({orgName,userName,fileName}){
        const data = {
            userName:userName,
            orgName:orgName,
            fileName:fileName,
        }
        console.log(data)
        return new Promise((resolve,reject) => {
            request({
                url: '/content/thresholdDecrypt',
                method: 'get',
                params:data,
            }).then(response => {
                if(response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },

    // decrypt: function ({ user, cipher, sharedUser, fileName, tags }) {
    //     // userName   解密用户
    //     // fileName   解密文件名
    //     // cipher     密文
    //     // sharedUser 文件共享者
    //     const data = {
    //         userName: user,
    //         fileName,
    //         cipher,
    //         tags,
    //         sharedUser,
    //     }
    //
    //     return new Promise((resolve, reject) => {
    //         request({
    //             url: '/content/decryption',
    //             method: 'post',
    //             data
    //         }).then(response => {
    //             // {
    //             //     "code":200     200, 成功; 其他，失败
    //             //     "msg":null,    描述
    //             //     "data": content 共享文件内容
    //             // }
    //             if (response.code === 200) {
    //                 resolve(response.data)
    //             }
    //             else {
    //                 reject(response)
    //             }
    //         }).catch(reject)
    //     })
    // },

    /**
     * 下载共享文件
     * @param {*} _data 参数
     * @returns Promise
     */
    download: function ({ fileName, orgName }) {
        // fileName   解密文件名
        // sharedUser 文件共享者
        const data = {
            fileName,
            orgName,
        }

        return new Promise((resolve, reject) => {
            axios.request({
                baseURL: process.env.NODE_ENV === "development" ? process.env.VUE_APP_DEV_URL : process.env.VUE_APP_PRO_URL,
                url: '/content/thresholdDownload',
                method: 'get',
                data,
                params: data,
                responseType: 'blob', // important
            }).then(response => {
                // {
                //     "code":200     200, 成功; 其他，失败
                //     "msg":null,    描述
                //     "data":content 共享文件内容
                // }
                if (response.status === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(reject)
        })
    },


}