package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.dto.ImgResp;
import com.itnihongo.kamehouse.service.IStorageService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Base64;
import java.util.stream.Stream;

@Service
public class StorageServiceImpl implements IStorageService {

    String url = "https://api.imgbb.com/1/upload?key=e99add80ea05d9c2595822aa25a18c4e";

    @Override
    public String uploadImage(MultipartFile multipartFile) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new ByteArrayResource(Base64.getEncoder().encode(multipartFile.getBytes())));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ImgResp> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, ImgResp.class);


        return response.getBody().getData().getDisplay_url();
    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public Path load(String filename) {
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
    }

    @Override
    public void deleteAll() {

    }
}
