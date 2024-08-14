package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepo sur;

    // Create or Update
    public Loginentity saveOrUpdate(Loginentity data) {
        return sur.save(data);
    }

    // Read all
    public List<Loginentity> getAllData() {
        return sur.findAll();
    }

    // Read by ID
    public Optional<Loginentity> getDataById(Integer id) {
        return sur.findById(id);
    }

    // Update
    public Loginentity updateData(Integer id, Loginentity newData) {
        return sur.findById(id).map(user -> {
            user.setUsername(newData.getUsername());
            user.setEmail(newData.getEmail());
            user.setPassword(newData.getPassword());
            return sur.save(user);
        }).orElse(null);
    }

    // Delete
    public boolean deleteData(Integer id) {
        if (sur.existsById(id)) {
            sur.deleteById(id);
            return true;
        }
        return false;
    }
    
    public Loginentity postData(Loginentity data) {
        return sur.save(data);
    }
}
