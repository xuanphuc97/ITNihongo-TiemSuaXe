package com.itnihongo.kamehouse.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "services")
@Getter
@Setter
@ToString
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "garage_id", nullable = false)
    private Garage garage;

    @Column(name = "service_name", nullable = false, length = 100)
    private String serviceName;

    @Column(name = "service_price", nullable = false)
    private BigDecimal servicePrice;

//    public void Service() {
//        id = 0;
//        serviceName = "";
//        servicePrice = null;
//    }
//    public String setServiceName(String name){
//        return this.serviceName = name;
//    }
//
//    public BigDecimal setPrice(){
//        return this.servicePrice;
//    }

}
