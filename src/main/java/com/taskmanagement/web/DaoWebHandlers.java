package com.taskmanagement.web;

import java.util.List;
import java.util.Map;

import com.britesnow.snow.util.JsonUtil;
import com.britesnow.snow.util.ObjectUtil;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.taskmanagement.dao.DaoRegistry;
import com.taskmanagement.dao.IDao;
import com.taskmanagement.entity.BaseEntity;
import com.taskmanagement.util.JSONOptions;

@Singleton
@SuppressWarnings({ "rawtypes", "unchecked" })
public class DaoWebHandlers {

    private DaoRegistry      daoRegistry;

    @Inject
    public DaoWebHandlers(DaoRegistry daoRegistry) {
        this.daoRegistry = daoRegistry;
    }

    @WebModelHandler(startsWith = "/daoGet")
    public void daoGet(@WebModel Map m, @WebParam("objType") String objType, @WebParam("obj_id") Long id) {
        IDao dao = daoRegistry.getDao(objType);
        Object obj = dao.get(id);
        m.put("result", obj);
    }

    @WebModelHandler(startsWith = "/daoList")
    public void daoList(@WebModel Map m, @WebParam("objType") String objType, @WebParam("opts") String jsonOpts) {
        IDao dao = daoRegistry.getDao(objType);
        
        JSONOptions opts = new JSONOptions(jsonOpts);
        
        List<Object> list = dao.list(opts.getPageIndex(), opts.getPageSize(), 
        		opts.getMatchMap(), opts.getOrderBy(), opts.getOrderType());
        
        // we need the count based after filter is applied.
        // ie, if there CompanyA has 50 Accounts and CompanyB has 50 Accounts, we need the result count as 50
        Long cnt = dao.count(opts.getMatchMap());
        m.put("result_count", cnt);
        m.put("result", list);
    }

    @WebActionHandler
    public Object daoSave(@WebParam("objType") String objType, @WebParam("obj_id") Long id,
                            @WebParam("objJson") String jsonObj) {
        Map jsonMap = JsonUtil.toMapAndList(jsonObj);
        IDao dao = daoRegistry.getDao(objType);
        Object obj = dao.get(id);
        if (obj == null) {
            obj = daoRegistry.getEntityInstance(objType);
        }
        try {
            ObjectUtil.populate(obj, jsonMap);

//            if (DEBUG_MAKE_SLOW) {
//                Thread.sleep(3000);
//            }

//        } catch (InterruptedException e) {
//            e.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        try {
//	        validatorManager.validate(obj);
            return dao.save(obj);
        } catch (Exception e) {
        	e.printStackTrace();
        	return e;
        }
        
    }

    @WebActionHandler
    public void daoDelete(@WebParam("objType") String objType, @WebParam("obj_id") Long id) {
        IDao dao = daoRegistry.getDao(objType);
        BaseEntity entity = (BaseEntity) dao.get(id);
        dao.delete(entity);
    }

}
