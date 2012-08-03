package com.taskmanagement.web;


import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.taskmanagement.dao.UserDao;
import com.taskmanagement.entity.User;


@Singleton
public class TmAuthService {
    @Inject
    UserDao userDao;
    
    @WebModelHandler(startsWith = "/")
    public void pageIndex(@WebModel Map m, RequestContext rc) {
        //gameTestManager.init();
        User user = getUserFromSession(rc);
        m.put("user", user);
    }

    @WebActionHandler
    public Object login(@WebParam("username") String userName, @WebParam("password") String password, RequestContext rc) {
        try {
            if (userName != null) {
                List<User> users = userDao.search("from User u where u.username = ?", new String[]{userName});
                if (users.size() == 1) {
                    User user = users.get(0);
                    if (authentication(user, password)) {
                        setUserToSession(rc, user);
                        String s = JSONObject.fromObject(user).toString();
                        return user;
                    } else {

                        setUserToSession(rc, null);
                        return "null_password";
                    }
                } else {
                    setUserToSession(rc, null);
                    return "multi_username";
                }

            } else {
                setUserToSession(rc, null);
                return "null_userName";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "null";
        }
    }

    @WebActionHandler
    public void logoff(RequestContext rc) {
        setUserToSession(rc, null);
    }

    @WebActionHandler
    public User register(@WebParam("username") String userName, @WebParam("password") String password, @WebModel Map map) {
        if (userName != null && password != null) {
            User user = new User();
            user.setUsername(userName);
            user.setName("name");
            user.setPassword(password);
            userDao.save(user);
            return user;
        }
        return null;
    }

    private boolean authentication(User user, String password) {
        if (user.getPassword().equals(password)) {
            return true;
        } else {
            return false;
        }
    }

    // --------- Private Helpers --------- //
    // store the user in the session. If user == null, then, remove it.
    private void setUserToSession(RequestContext rc, User user) {
        if (user != null) {
            rc.getReq().getSession(true).setAttribute("userid", user.getId());
        } else {
            if (rc.getReq().getSession() != null) {
                rc.getReq().getSession().removeAttribute("userid");
            }

        }
    }

    private User getUserFromSession(RequestContext rc) {
        Long userId = (Long) rc.getReq().getSession().getAttribute("userid");
        if (userId != null) {
            User user = userDao.get(userId);
            return user;
        } else {
            return null;
        }
    }
    // --------- /Private Helpers --------- //
}
