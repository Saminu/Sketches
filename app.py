import xlrd
import urllib2
#----------------------------------------------------------------------
def open_file(path):
    """
    Open and read an Excel file
    """
    book = xlrd.open_workbook(path)
    # print number of sheets
    # print book.nsheets
    # print sheet names
    # print book.sheet_names()
    # get the first worksheet
    first_sheet = book.sheet_by_index(1)

    link = 'http://www.econ.yale.edu/~shiller/data/chapt26.xls'
    socket = urllib2.urlopen(link)

    print (socket)

    #print selected sheetname
    #
    sheet_names = book.sheet_names()
    selectedSheet = book.sheet_by_name(sheet_names[0])

    print selectedSheet.name

    for name in book.sheet_names():
        # print names
        indSheet = book.sheet_by_name(name)
        # print indSheet.name
        # print indSheet.nrows
        # print indSheet.row(3)
        rownumbers = indSheet.nrows

        count = 0
        while count < rownumbers:
            count += 1
            # print(count)
        # print indSheet.row(count)

    # read a row
    # print first_sheet.row_values(3)

    # read a cell
    cell = first_sheet.cell(3,0)

    # print cell
    # print cell.value

    # read a row slice
    # print first_sheet.row_slice(rowx=0,
    #                             start_colx=0,
    #                             end_colx=2)

    # print book
#----------------------------------------------------------------------
if __name__ == "__main__":
    path = "data/food_price.xlsx"
    # path = "http://www.nigerianstat.gov.ng/resource/Selected food price watch feb2016-%20proshare.xlsx"
    open_file(path)