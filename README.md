## 소개

게시판 기능의 REST API입니다.

## 실행방법

```bash
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

```

## 환경설정

기본 포트는 3000 으로 하였고, DB는 MYSQL 을 사용하였습니다.

```SQL
CREATE DATABASE board_db default CHARACTER SET UTF8;
```

코드퍼스트 구조이기 때문에
최초 DB만 생성해주면 서버 실행시 Entity에 의해 테이블들이 자동으로 생성됩니다.
다만 스키마 구성의 참조를 위해 생성쿼리를 공유합니다.
다음 쿼리는 자동생성된 테이블의 생성쿼리입니다.

```SQL
CREATE TABLE `board` (
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `writer` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `board_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `comment` (
  `comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `writer` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `isDelete` tinyint NOT NULL DEFAULT '0',
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FK_77a3101cc141a4046264ce59d6d` (`board_id`),
  CONSTRAINT `FK_77a3101cc141a4046264ce59d6d` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `notice` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `keyword` varchar(40) NOT NULL,
  `user` varchar(20) NOT NULL,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

```

## 게시판 API 목록

- 게시판 목록 : `GET` /api/board
- 게시판 생성 : `POST` /api/board
- 게시판 수정 : `PUT` /api/board
- 게시판 삭제 : `DELETE` /api/board

### 게시판 목록 및 검색

`GET` /api/board

```
SearchBoardDTO {
    id: number
    title: string;
    writer: string;
    page: number;
}
```

모두 옵셔널이며, 페이지는 최소 1부터 가능하고 1페이지당 10개입니다.
파라미터가 모두 없을 경우 첫페이지의 10개가 호출됩니다.

### 게시판 생성

`POST` /api/board

```
WriteBoardDTO {
  title: string;
  content: string;
  writer: string;
  password: string;
}
```

모두 필수사항이며, 비밀번호는 암호화합니다.
title이나 content에 알림 키워드가 포함되어있다면 알람기능을 호출합니다.

### 게시판 수정

`PUT` /api/board

```
EditBoardDTO {
  id: number;
  title: string;
  content: string;
  writer: string;
  password: string;
}
```

모두 필수사항이며, 비밀번호가 기존 비밀번호와 일치할 경우면 수정됩니다.
title이나 content에 알림 키워드가 포함되어있다면 알람기능을 호출합니다.

### 게시판 삭제

`DELETE` /api/board

```
EditBoardDTO {
  id: number;
  password: string;
}
```

모두 필수사항이며, 비밀번호가 기존 비밀번호와 일치할 경우면 삭제됩니다.

## 댓글 API 목록

- 댓글 목록 : `GET` /api/comment
- 댓글 생성 : `POST` /api/comment

### 댓글 목록

`GET` /api/comment

```
SearchCommentDTO {
    boardId: number
    page: number;
}
```

모두 옵셔널이며, 페이지는 최소 1부터 가능하고 1페이지당 10개입니다.
파라미터가 모두 없을 경우 첫페이지의 10개가 호출됩니다.
각 페이지는 부모댓글에 자식댓글이 포함된 상태로 순서를 매깁니다.

### 댓글 생성

`POST` /api/comment

```
WriteCommentDTO {
  boardId: number;
  parentId: number;
  comment: string;
  writer: string;
}
```

parentId 를 제외하고 모두 필수사항입니다.
parentId 를 사용하는 comment가 부모를 갖고 있다면 생성하지 않습니다.
즉 댓글의 댓글까지만 허용됩니다.
comment에 알림 키워드가 포함되어있다면 알람기능을 호출합니다.
