import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'model/source.dart';

void main() {
  final jsSources = _searchJsSources(Directory("."));
  genManga(
    jsSources.where((element) => element.itemType!.name == "manga").toList(),
  );
  genAnime(
    jsSources.where((element) => element.itemType!.name == "anime").toList(),
  );
  genNovel(
    jsSources.where((element) => element.itemType!.name == "novel").toList(),
  );
  genIndex(jsSources);
}

void genManga(List<Source> jsMangasourceList) {
  final List<Map<String, dynamic>> jsonList = jsMangasourceList
      .map((source) => source.toJson())
      .toList();
  final jsonString = jsonEncode(jsonList);

  final file = File('index.json');
  file.writeAsStringSync(jsonString);

  log('JSON file created: ${file.path}');
}

void genIndex(List<Source> jsSources) {
  final List<Map<String, dynamic>> jsonList = jsSources
      .map((source) => source.toJson())
      .toList();
  final jsonString = jsonEncode(jsonList);

  final file = File('index.json');
  file.writeAsStringSync(jsonString);

  log('JSON file created: ${file.path}');
}

void genNovel(List<Source> jsNovelSourceList) {
  final List<Map<String, dynamic>> jsonList = jsNovelSourceList
      .map((source) => source.toJson())
      .toList();
  final jsonString = jsonEncode(jsonList);

  final file = File('novel_index.json');
  file.writeAsStringSync(jsonString);

  log('JSON file created: ${file.path}');
}

void genAnime(List<Source> jsAnimeSourceList) {
  final List<Map<String, dynamic>> jsonList = jsAnimeSourceList
      .map((source) => source.toJson())
      .toList();
  final jsonString = jsonEncode(jsonList);

  final file = File('anime_index.json');
  file.writeAsStringSync(jsonString);

  log('JSON file created: ${file.path}');
}

List<Source> _searchJsSources(Directory dir) {
  List<Source> sourceList = [];
  List<FileSystemEntity> entities = dir.listSync();
  for (FileSystemEntity entity in entities) {
    if (entity is Directory) {
      if (entity.path.contains('not_working') || entity.path.contains('deprecated') || entity.path.contains('javascript')) {
        continue;
      }
      sourceList.addAll(_searchJsSources(entity));
    } else if (entity is File && entity.path.endsWith('.js')) {
      final regex = RegExp(
        r'const\s+mangayomiSources\s*=\s*(\[.*?\]);',
        dotAll: true,
      );
      final defaultSource = Source();
      final match = regex.firstMatch(entity.readAsStringSync());
      if (match != null) {
        for (var sourceJson in jsonDecode(match.group(1)!) as List) {
          final langs = sourceJson["langs"] as List?;
          Source source = Source.fromJson(sourceJson)
            ..sourceCodeLanguage = 1
            ..appMinVerReq =
                sourceJson["appMinVerReq"] ?? defaultSource.appMinVerReq
            ..sourceCodeUrl =
                "https://raw.githubusercontent.com/RandomUs3rInTh3Int3rn3t/prod_extension2/main/${sourceJson["pkgPath"] ?? sourceJson["pkgName"]}";
          if (sourceJson["id"] != null) {
            source = source..id = int.tryParse("${sourceJson["id"]}");
          }
          if (langs?.isNotEmpty ?? false) {
            for (var lang in langs!) {
              final id = sourceJson["ids"]?[lang] as int?;
              sourceList.add(
                Source.fromJson(source.toJson())
                  ..lang = lang
                  ..id =
                      id ??
                      'mangayomi-js-"$lang"."${source.name}"'.hashCode,
              );
            }
          } else {
            sourceList.add(source);
          }
        }
      }
    }
  }
  return sourceList;
}
