package com.itnihongo.kamehouse.dto;

import lombok.Data;

@Data
public class ImgResp {
    private Detail data;

    private boolean success;

    private String status;

    @Data
    public class Detail {
        private String id;
        private String title;
        private String url_viewer;
        private String url;
        private String display_url;
        private String size;
        private String time;
        private String expiration;
        private String delete_url;
    }
}
