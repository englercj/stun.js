/**
 * This is a test message from RFC5769 - Test Vectors for Session Traversal Utilities for NAT (STUN)
 * https://tools.ietf.org/html/rfc5769
 *
 *
 *
 * 2.1.  Sample Request
 *
 * This request uses the following parameters:
 *
 * Software name:  "STUN test client" (without quotes)
 *
 * Username:  "evtj:h6vY" (without quotes)
 *
 * Password:  "VOkJxbRl1RmTxUk/WvJxBt" (without quotes)
 *
 *        00 01 00 58     Request type and message length
 *        21 12 a4 42     Magic cookie
 *        b7 e7 a7 01  }
 *        bc 34 d6 86  }  Transaction ID
 *        fa 87 df ae  }
 *        80 22 00 10     SOFTWARE attribute header
 *        53 54 55 4e  }
 *        20 74 65 73  }  User-agent...
 *        74 20 63 6c  }  ...name
 *        69 65 6e 74  }
 *        00 24 00 04     PRIORITY attribute header
 *        6e 00 01 ff     ICE priority value
 *        80 29 00 08     ICE-CONTROLLED attribute header
 *        93 2f f9 b1  }  Pseudo-random tie breaker...
 *        51 26 3b 36  }   ...for ICE control
 *        00 06 00 09     USERNAME attribute header
 *        65 76 74 6a  }
 *        3a 68 36 76  }  Username (9 bytes) and padding (3 bytes)
 *        59 20 20 20  }
 *        00 08 00 14     MESSAGE-INTEGRITY attribute header
 *        9a ea a7 0c  }
 *        bf d8 cb 56  }
 *        78 1e f2 b5  }  HMAC-SHA1 fingerprint
 *        b2 d3 f2 49  }
 *        c1 b5 71 a2  }
 *        80 28 00 04     FINGERPRINT attribute header
 *        e5 7a 3b cf     CRC32 fingerprint
 *
 */

var Buffer = require('buffer').Buffer;
module.exports = new Buffer([
    0x00, 0x01, 0x00, 0x58, //    Request type and message length
    0x21, 0x12, 0xa4, 0x42, //    Magic cookie
    0xb7, 0xe7, 0xa7, 0x01, // }
    0xbc, 0x34, 0xd6, 0x86, // }  Transaction ID
    0xfa, 0x87, 0xdf, 0xae, // }
    0x80, 0x22, 0x00, 0x10, //    SOFTWARE attribute header
    0x53, 0x54, 0x55, 0x4e, // }
    0x20, 0x74, 0x65, 0x73, // }  User-agent...
    0x74, 0x20, 0x63, 0x6c, // }  ...name
    0x69, 0x65, 0x6e, 0x74, // }
    0x00, 0x24, 0x00, 0x04, //    PRIORITY attribute header
    0x6e, 0x00, 0x01, 0xff, //    ICE priority value
    0x80, 0x29, 0x00, 0x08, //    ICE-CONTROLLED attribute header
    0x93, 0x2f, 0xf9, 0xb1, // }  Pseudo-random tie breaker...
    0x51, 0x26, 0x3b, 0x36, // }   ...for ICE control
    0x00, 0x06, 0x00, 0x09, //    USERNAME attribute header
    0x65, 0x76, 0x74, 0x6a, // }
    0x3a, 0x68, 0x36, 0x76, // }  Username (9 bytes) and padding (3 bytes)
    0x59, 0x20, 0x20, 0x20, // }
    0x00, 0x08, 0x00, 0x14, //    MESSAGE-INTEGRITY attribute header
    0x9a, 0xea, 0xa7, 0x0c, // }
    0xbf, 0xd8, 0xcb, 0x56, // }
    0x78, 0x1e, 0xf2, 0xb5, // }  HMAC-SHA1 fingerprint
    0xb2, 0xd3, 0xf2, 0x49, // }
    0xc1, 0xb5, 0x71, 0xa2, // }
    0x80, 0x28, 0x00, 0x04, //    FINGERPRINT attribute header
    0xe5, 0x7a, 0x3b, 0xcf  //    CRC32 fingerprint
]);
