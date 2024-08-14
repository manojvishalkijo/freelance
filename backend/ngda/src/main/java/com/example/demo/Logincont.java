package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:5173")
public class Logincont {

    @Autowired
    LoginService sus;

    @Autowired
    LoginRepo sur;

    @PostMapping("/reg")
    public ResponseEntity<Loginentity> registerUser(@RequestBody Loginentity data) {
        try {
            Loginentity user = sus.saveOrUpdate(data);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Loginentity> loginUser(@RequestBody Loginentity loginDetails) {
        Loginentity user = sur.findByEmail(loginDetails.getEmail());
        if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/get")
    public List<Loginentity> getData() {
        return sus.getAllData();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Loginentity> updateUser(@PathVariable Integer id, @RequestBody Loginentity newData) {
        Loginentity updatedUser = sus.updateData(id, newData);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Integer id) {
        if (sus.deleteData(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
