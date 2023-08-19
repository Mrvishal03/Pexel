package com.company.SignUpForm.Repository;

import com.company.SignUpForm.Model.User;
import org.springframework.data.repository.CrudRepository;

public interface FormRepository extends CrudRepository<User,String>{
}