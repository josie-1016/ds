import request from '@/utils/request'
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
    downLoadThresholdFile: function({orgName,userName,fileName}){
        const data = {
            userName:userName,
            orgName:orgName,
            fileName:fileName,
        }
        console.log(data)
        return new Promise((resolve,reject) => {
            request({
                url: '/content/ThresholdDownload',
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
}