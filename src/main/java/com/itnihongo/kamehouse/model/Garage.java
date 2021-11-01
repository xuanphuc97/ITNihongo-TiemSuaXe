package com.itnihongo.kamehouse.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "garages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Garage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "garage_name", nullable = false, length = 100)
    private String garageName;

    @Column(name = "phone_number", nullable = false, length = 50)
    private String phoneNumber;

    @Column(name = "address", nullable = false, length = 200)
    private String address;

    @Column(name = "location", nullable = false, length = 100)
    private String location;

    @Transient
    @Column(name = "image")
    private String image;

    @Column(name = "start_at", nullable = false)
    private LocalTime startAt;

    @Column(name = "end_at", nullable = false)
    private LocalTime endAt;

    @Column(name = "active", nullable = false)
    private Boolean active = false;

    @Column(name = "del_flag", nullable = false)
    private Boolean delFlag = false;

    public Garage(String garageName, String phoneNumber, String address, String location, String image, String startAt, String endAt) {
        this.garageName = garageName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.location = location;
        this.image = image;
        this.startAt = LocalTime.parse(startAt);
        this.endAt = LocalTime.parse(endAt);
    }
}
