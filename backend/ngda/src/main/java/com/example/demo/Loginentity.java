package com.example.demo;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Loginentity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;
    

	@Column(nullable = false, unique = true)
    private String email;

    
    @Column(nullable = false)
    private String password;

    public String getEmail() {
		return email;
	}
    public Integer getId() {
    	return id;
    }
    
    public void setId(Integer id) {
    	this.id = id;
    }

	public void setEmail(String email) {
		this.email = email;
	}

 String getUsername() {
    	return username;
    }
    
    public void setUsername(String username) {
    	this.username = username;
    }
  
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
